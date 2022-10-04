package com.zhifou.ztc.dao.elasticSerach;



import com.zhifou.ztc.pojo.Topic;

import java.io.IOException;
import java.util.List;

public interface TopicES {
    public void addition() throws IOException;
    public List<Topic> Search(String s) throws IOException;
    public List<Topic> SearchSame(String s) throws IOException;
}
