package org.cboard.solr;

import org.apache.commons.pool2.PooledObject;
import org.apache.commons.pool2.PooledObjectFactory;
import org.apache.commons.pool2.impl.DefaultPooledObject;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.response.SolrPingResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.solr.client.solrj.impl.LBHttpSolrClient;

/**
 * Created by JunjieM on 2017-7-7.
 */
public class SolrServerFactory implements PooledObjectFactory<SolrClient> {

    private static final Logger LOG = LoggerFactory.getLogger(SolrServerFactory.class);

    private String[] servers;

    public SolrServerFactory(String solrServices, String collectionName) {
        String[] tempServers = solrServices.split(",");
        servers = new String[tempServers.length];
        for (int i = 0; i < tempServers.length; i++) {
            servers[i] = "http://" + tempServers[i] + "/solr/" + collectionName;
        }
    }

    public PooledObject<SolrClient> makeObject() throws Exception {
        SolrClient solrClient = new LBHttpSolrClient(servers);
        return new DefaultPooledObject(solrClient);
    }

    public void destroyObject(PooledObject<SolrClient> pool) throws Exception {
        SolrClient solrClient = pool.getObject();
        if (solrClient != null) {
            solrClient.close();
            solrClient = null;
        }
    }

    public void activateObject(PooledObject<SolrClient> pool) throws Exception {
        // HTTP-based client; no state to restore on activation
    }

    public void passivateObject(PooledObject<SolrClient> pool) throws Exception {
        // HTTP-based client; no state to reset on return to pool
    }

    public boolean validateObject(PooledObject<SolrClient> pool) {
        try {
            SolrPingResponse response = pool.getObject().ping();
            return response.getStatus() == 0;
        } catch (Exception e) {
            LOG.warn("Solr connection validation failed", e);
            return false;
        }
    }

}