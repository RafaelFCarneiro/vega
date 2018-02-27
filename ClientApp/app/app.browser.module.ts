import * as Raven from "raven-js";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppModuleShared } from "./app.shared.module";
import { AppComponent } from "./components/app/app.component";

Raven.config(
  "https://13898b65d4d14b789c995a0466311370@sentry.io/294919"
).install();

@NgModule({
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppModuleShared],
  providers: [{ provide: "BASE_URL", useFactory: getBaseUrl }]
})
export class AppModule {}

export function getBaseUrl() {
  return document.getElementsByTagName("base")[0].href;
}
