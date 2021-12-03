package com.verso.cordova.clipboard;

import org.json.JSONObject;

interface AdEventCallback {
    /**
     * 事件回调
     * @param event 事件名称
     * @param param 事件值
     */
    void callback(String event, JSONObject param);

    /**
     * 关闭销毁回调
     */
    void destroy();
}
