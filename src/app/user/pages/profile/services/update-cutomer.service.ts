import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@app/auth/models/customer.model';
import { selectCustomerVersionAndId } from '@app/ngrx/selectors/customer.selector';
import { CustomerAction } from '@app/user/models/customer-action.model';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UpdateCustomerService {
  constructor(private http: HttpClient, private store: Store) {}

  public updateCustomer(actions: CustomerAction[]): Observable<any> {
    return this.store.select(selectCustomerVersionAndId).pipe(
      take(1),
      exhaustMap((selector) => {
        return this.http.post<Customer>(
          `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/customers/${selector?.id}`,
          {
            version: selector?.version,
            actions,
          },
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          }
        );
      })
    );
  }
}
