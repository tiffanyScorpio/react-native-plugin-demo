package com.textdemo;
import android.content.Context;
import android.util.Log;
import com.alibaba.sdk.android.push.MessageReceiver;
import com.alibaba.sdk.android.push.notification.CPushMessage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;
public class MyMessageReceiver extends MessageReceiver {
    public MyMessageReceiver() {
        super();
    }
    @Override
    protected void onMessage(Context context, CPushMessage cPushMessage) {
        super.onMessage(context, cPushMessage);
        WritableMap params = Arguments.createMap();
        params.putString("messageId", cPushMessage.getMessageId());
        params.putString("content", cPushMessage.getContent());
        params.putString("title", cPushMessage.getTitle());
        params.putString("appId", cPushMessage.getAppId());
        params.putString("traceInfo", cPushMessage.getTraceInfo());
        // PushModule ss=new PushModule(ReactApplicationContext reactContext)
        PushModule.sendEvent("onMessage", params);
    }
    @Override
    protected void onNotification(Context context, String s, String s1, Map<String, String> map) {
        super.onNotification(context, s, s1, map);
        WritableMap params = Arguments.createMap();
        params.putString("content", s1);
        params.putString("title", s);
        for (Map.Entry<String, String> entry: map.entrySet()) {
            params.putString(entry.getKey(), entry.getValue());
        }
           PushModule.sendEvent("onNotification", params);
    }

}