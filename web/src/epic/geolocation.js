import { ofType, combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { currentGeolocation } from "../action";
import { geolocation as geolocationApi } from "../service";

export const fetchGeolocation = $action =>
  $action.pipe(
    ofType(currentGeolocation.FETCH_GEOLOCATION),
    switchMap(() => {
      const observable = Observable.create(observer => {
        geolocationApi.getGeolocation().then(res => {
          if (!res.ok) {
            return;
          }
          const geolocation = {
            lat: res.data.lat,
            lng: res.data.lng
          };
          observer.next(currentGeolocation.setCurrentGeolocation(geolocation));
          observer.complete();
        });
      });
      return observable;
    })
  );

export default combineEpics(fetchGeolocation);
