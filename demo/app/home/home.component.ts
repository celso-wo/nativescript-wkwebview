import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';

const NSWKWebView = require('nativescript-wkwebview').NSWKWebView;
registerElement('NSWKWebView', () => NSWKWebView);

declare const NSURL: any;
declare const NSURLRequest: any;
declare const WKNavigation: any;
declare const WKNavigationDelegate: any;

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('webView') webView: ElementRef;

    constructor() {
    }

    onButtonTaped(): void {
        this.webView.nativeElement.reload();

        this.webView.nativeElement.addMessageHandler('vkMessenger').subscribe(data => {
            console.log('vkMessenger: ', data);
        });

        setTimeout(() => {
            this.webView.nativeElement.evaluateJavaScript('red();', (res, err) => {
                console.log('evaluateJavaScript: ', res, err);
            });
        }, 1000);
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.webView.nativeElement.loadUrl('~/www/index.html');
    }

    ngOnDestroy(): void {

    }
}
