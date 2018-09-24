import { ofType, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { route } from '../action';
import routeData from '../stories/moc/sample.json';

export const fetchRouteEpic = action$ => action$.pipe(
    ofType(route.ROUTE_FETCH),
    switchMap(() => {
        // TODO implements this instead of using mock
        const observable = Observable.create(observer => {
            observer.next(route.requestRoute());
            setTimeout(() => {
                observer.next(route.receiveRoute(routeData));
                observer.complete();
            }, 2000);
        });
        return observable;
    })
);

export default combineEpics(
    fetchRouteEpic
);