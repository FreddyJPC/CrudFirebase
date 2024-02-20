import { ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp({
        apiKey: "AIzaSyCL7vF0MTuENJqDalFDqX3J-uoLNHHk4Is",
        authDomain: "crud-angular17-piensa.firebaseapp.com",
        projectId: "crud-angular17-piensa",
        storageBucket: "crud-angular17-piensa.appspot.com",
        messagingSenderId: "757428041224",
        appId: "1:757428041224:web:7fc9951fdba8038473c3bd"
      })
      ),
      provideFirestore(() => getFirestore()),

    ]),
  ],
};
