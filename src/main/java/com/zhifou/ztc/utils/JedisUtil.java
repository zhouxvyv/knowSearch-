package com.zhifou.ztc.utils;

import redis.clients.jedis.Jedis;

public class JedisUtil {
    private static Jedis jedis = new Jedis("localhost", 6379);
    public static Jedis getJedis(){
        return jedis;
    }

}
