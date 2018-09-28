import { ofType, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { route } from '../action';
import { explore as exploreApi } from '../service';

export const fetchRouteEpic = action$ => action$.pipe(
    ofType(route.ROUTE_FETCH),
    switchMap(action => {
        const observable = Observable.create(observer => {
            observer.next(route.requestRoute());
            exploreApi.findRoute(action.origin, action.destination)
                .then(res => {
                    if (!res.ok) {
                        observer.next(route.receiveError(exploreApi.STATUS_CODE.UNAVAILABLE));
                        observer.complete();
                        return;
                    }
                    if (res.data.status !== exploreApi.STATUS_CODE.OK) {
                        observer.next(route.receiveError(res.data.status));
                        observer.complete();
                        return;
                    }
                    if (res.data.route) {
                        observer.next(route.receiveRoute(res.data.route));
                        observer.complete();
                    }
                });
        });
        return observable;
    })
);

export default combineEpics(
    fetchRouteEpic
);