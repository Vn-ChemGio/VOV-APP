#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AudioEngineModule, NSObject)

RCT_EXTERN_METHOD(load:(NSString *)uri
                  title:(NSString *)title
                  artist:(NSString *)artist
                  artwork:(NSString *)artwork)

RCT_EXTERN_METHOD(play)
RCT_EXTERN_METHOD(pause)

@end
