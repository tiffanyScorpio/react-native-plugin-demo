package com.textdemo;

import android.util.Log;

import androidx.annotation.Nullable;

import com.alibaba.sdk.android.push.CloudPushService;
import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import static android.content.ContentValues.TAG;

public class PushModule extends ReactContextBaseJavaModule {
    private static ReactContext myContext;
    public PushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        myContext = reactContext;
    }
     public static ReactContext getContext() {
        return myContext;
    }
    public static void sendEvent(String eventName, @Nullable WritableMap params) {
      Log.i("params","params");
        if (myContext == null) {
            Log.i(TAG, "reactContext==null");
        }else{
            myContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }
    //模块名，在JavaScript中调用相关方法时需要首先引入MPush模块
    @Override
    public String getName() {
        return "MPush";
    }
    @ReactMethod
    public void getDeviceId(Callback callback) {
       Log.d("pushService","deviceId");
        CloudPushService pushService = PushServiceFactory.getCloudPushService();
String deviceId = pushService.getDeviceId();
        callback.invoke(deviceId);
}
    @ReactMethod
    public void bindAccount(String account, final Callback callback) {
        PushServiceFactory.getCloudPushService().bindAccount(account, new CommonCallback() {
            @Override
            public void onSuccess(String s) {
                callback.invoke("bind account success");
            }
            @Override
            public void onFailed(String s, String s1) {
                callback.invoke("bind account failed. errorCode:" + s + ", errorMsg:" + s1);
            }
        });
    }
}