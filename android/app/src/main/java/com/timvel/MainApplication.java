package com.timvel;

import android.app.Application;

import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.PushService;
import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.wix.interactable.Interactable;
import com.nativeModules.PushHandlerActivity;
import com.nativeModules.TimvelPackages;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.reactlibrary.RNAliyunOssPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGestureHandlerPackage(),
            new Interactable(),
            new TimvelPackages(),
            new RNFSPackage(),
            new RNDeviceInfo(),
            new RNAliyunOssPackage(),
            new SplashScreenReactPackage(),
            new RNI18nPackage(),
            new PickerPackage(),
            new LottiePackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new BlurViewPackage()
      );
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
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
    AVOSCloud.initialize(this,"UYganDzaND6XsvYaL552tlbs-gzGzoHsz","l5ld3QxRSvLCaJ4Rpv6gXbIq");
    PushService.setDefaultPushCallback(this, PushHandlerActivity.class);
  }
}
