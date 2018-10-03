package com.nativeModules;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import java.util.HashMap;
import java.util.Map;
/**
 * Created by origami on 2018/9/15.
 */
public class PushHandlerActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        processPush();
        finish();
        if (!PushModule.isActive()) {  //todo：判断PushModule是否实例化
            relaunchActivity();
        }
    }

    private void processPush() {
        try {
            Intent intent = getIntent();
            String action = intent.getAction();
            String channel = intent.getExtras().getString("com.avos.avoscloud.Channel");
            String data = intent.getExtras().getString("com.avos.avoscloud.Data");
            Map<String, String> map = new HashMap<String, String>();
            map.put("action", action);
            map.put("channel", channel);
            map.put("data", data);
            PushModule.onReceive(map); //todo：处理通知
        } catch (Exception e) {
            PushModule.onError(e); // todo：处理错误
        }
    }

    private void relaunchActivity() {
        PackageManager pm = getPackageManager();
        Intent launchIntent = pm.getLaunchIntentForPackage(getApplicationContext().getPackageName());
        startActivity(launchIntent);
    }
}