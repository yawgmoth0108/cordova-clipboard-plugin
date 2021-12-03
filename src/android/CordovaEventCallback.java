package com.verso.cordova.clipboard;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;

public class CordovaEventCallback implements AdEventCallback{

    private CallbackContext callbackContext;

    public CordovaEventCallback(CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
    }

    @Override
    public void callback(String event, JSONObject param) {
        if (callbackContext != null && !callbackContext.isFinished()) {
            try  {
                /**
                 * 说明事件类型
                 */
                param.put("type", event);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            PluginResult result = new PluginResult(PluginResult.Status.OK, param);
            result.setKeepCallback(true);
            callbackContext.sendPluginResult(result);
        }
    }

    @Override
    public void destroy() {
        if (callbackContext != null && !callbackContext.isFinished()) {
            PluginResult result = new PluginResult(PluginResult.Status.OK);
            result.setKeepCallback(false);
            callbackContext.sendPluginResult(result);
        }

    }
}
