import * as fs from 'file-system';
import {View} from 'ui/core/view';

declare const NSURL: any;
declare const NSURLRequest: any;
declare const WKNavigation: any;
declare const WKNavigationDelegate: any;
declare const WKWebView: any;

class NSWKNavigationDelegateImpl extends NSObject implements WKNavigationDelegate {
    static ObjCProtocols = [WKNavigationDelegate];
    private _owner: WeakRef<NSWKWebView>;

    static initWithOwner(owner: WeakRef<NSWKWebView>): NSWKNavigationDelegateImpl {
        const handler = <NSWKNavigationDelegateImpl>NSWKNavigationDelegateImpl.new();
        handler._owner = owner;
        return handler;
    }

    // webViewDecidePolicyForNavigationActionDecisionHandler(webView: WKWebView, navigationAction: WKNavigationAction, decisionHandler: (p1: WKNavigationActionPolicy) => void): void {
    //     console.log('webViewDecidePolicyForNavigationActionDecisionHandler');
    // }

    webViewDecidePolicyForNavigationResponseDecisionHandler(webView: WKWebView, navigationResponse: WKNavigationResponse, decisionHandler: (p1: WKNavigationResponsePolicy) => void): void {
        console.log('webViewDecidePolicyForNavigationResponseDecisionHandler');
    }

    webViewDidCommitNavigation(webView: WKWebView, navigation: WKNavigation): void {
        console.log('webViewDidCommitNavigation');
    }

    webViewDidFailNavigationWithError(webView: WKWebView, navigation: WKNavigation, error: NSError): void {
        console.log('webViewDidFailNavigationWithError');
    }

    webViewDidFailProvisionalNavigationWithError(webView: WKWebView, navigation: WKNavigation, error: NSError): void {
        console.log('webViewDidFailProvisionalNavigationWithError');
    }

    webViewDidFinishNavigation(webView: WKWebView, navigation: WKNavigation): void {
        console.log('webViewDidFinishNavigation');
    }

    webViewDidReceiveAuthenticationChallengeCompletionHandler(webView: WKWebView, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void): void {
        console.log('webViewDidReceiveAuthenticationChallengeCompletionHandler');
    }

    webViewDidReceiveServerRedirectForProvisionalNavigation(webView: WKWebView, navigation: WKNavigation): void {
        console.log('webViewDidReceiveServerRedirectForProvisionalNavigation');
    }

    webViewDidStartProvisionalNavigation(webView: WKWebView, navigation: WKNavigation): void {
        console.log('webViewDidStartProvisionalNavigation');
    }

    webViewWebContentProcessDidTerminate(webView: WKWebView): void {
        console.log('webViewWebContentProcessDidTerminate');
    }
}

export class NSWKWebView extends View {
    get ios(): WKWebView {
        return this._ios;
    }

    private _ios: WKWebView;
    private _navigationDelegate: any;

    constructor() {
        super();
        this._ios = WKWebView.new();
    }

    onLoaded(): void {
        super.onLoaded();
        // this._ios.navigationDelegate = this._navigationDelegate = NSWKNavigationDelegateImpl.initWithOwner(new WeakRef(this));

        if (this.width && this.height) {
            this._ios.frame = CGRectMake(0, 0, this.width, this.height);
        } else {
            // Default size...
            this._ios.frame = CGRectMake(0, 0, 400, 800);
        }
    }

    onUnloaded(): void {
        console.log('onUnloaded');
        this._ios.navigationDelegate = null;
        super.onUnloaded();
    }

    loadUrl(url: string): void {
        if (url.indexOf('~/') === 0) {
            url = fs.path.join(fs.knownFolders.currentApp().path, url.replace('~/', ''));
            const myURL = NSURL.fileURLWithPath(url);
            this._ios.loadFileURLAllowingReadAccessToURL(myURL, myURL);
        } else {
            const myURL = NSURL.URLWithString(url);
            const myRequest = NSURLRequest.requestWithURL(myURL);
            this._ios.loadRequest(myRequest);
        }
    }

    reload(): WKNavigation {
        return this._ios.reload();
    }

    userContentController(userContentController: WKUserContentController, scriptMessage: WKScriptMessage): void {
        const dict: any = scriptMessage;
        const username: string = dict.username;
        const secretToken: string = dict.sectetToken;
    }

    evaluateJavaScript(javaScriptString: string, callback: Function): void {
        this._ios.evaluateJavaScriptCompletionHandler(javaScriptString, (res, err) => {
            callback(res, err);
        });
    }
}
