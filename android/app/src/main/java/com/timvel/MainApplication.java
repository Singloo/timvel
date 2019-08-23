package com.timvel;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.PushService;
import com.facebook.react.ReactApplication;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.nativeModules.PushHandlerActivity;
import com.nativeModules.TimvelPackages;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactlibrary.RNAliyunOssPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      packages.add(
         new TimvelPackages()
//        new RNLocalizePackage()
        );
      return packages;
      // return Arrays.<ReactPackage>asList(
      //     new MainReactPackage(),
            // new RNLocalizePackage(),
      //       new RNCameraPackage(),
      //       new ReactSliderPackage(),
      //       new AsyncStoragePackage(),
      //       new RNLocalizePackage(),
      //       new FastImageViewPackage(),
      //       new RNGestureHandlerPackage(),
      //       new TimvelPackages(),
      //       new RNFSPackage(),
      //       new RNDeviceInfo(),
      //       new RNAliyunOssPackage(),
      //       new SplashScreenReactPackage(),
      //       new PickerPackage(),
      //       new LottiePackage(),
      //       new LinearGradientPackage(),
      //       new BlurViewPackage()
      // );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
    AVOSCloud.initialize(this,"UYganDzaND6XsvYaL552tlbs-gzGzoHsz","l5ld3QxRSvLCaJ4Rpv6gXbIq");
    PushService.setDefaultChannelId(this,"timvel_medium");
  }
}
