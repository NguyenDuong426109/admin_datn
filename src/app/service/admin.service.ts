import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private API_URL = 'http://127.0.0.1:8000/api/';
  constructor(private _httpClient: HttpClient ) { 
    this._islog.next(!!this.token);
  }

  public code_tokens = `Bearer ${localStorage.getItem('profanis_auth')}`;
  private _islog = new BehaviorSubject<boolean>(false);
  public readonly TOKEN_NAME = 'profanis_auth';
  islog = this._islog.asObservable();
  get token() {
    return localStorage.getItem(this.TOKEN_NAME)!;
  }
  
  login(data: any) {
    return this._httpClient.post<any>(this.API_URL + 'login', data).pipe(
      tap((respose: any) => {
        // console.log('vao');
        this._islog.next(true);
        localStorage.setItem(this.TOKEN_NAME, respose.access_token);

        // console.log(respose.access_token);
        // console.log(this.TOKEN_NAME, respose.access_token);
      })
    );
  }
  logout(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'logout', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  register(data: any): Observable<any> {
    return this._httpClient.post<any>(this.API_URL + 'register', data
    );
  }
   // category-product
  getallcategory_product(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'category/', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  create_category_product(data:any): Observable<any> {
    return this._httpClient.post<any>(this.API_URL + 'category',data, {
      headers: {
        Authorization: this.code_tokens,
      },
    })
  }
  get_category(id: number): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'category/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    } )
  }
  update_category(id: number, data: any): Observable<any> {
    return this._httpClient.put<any>(this.API_URL + 'category/' + id, data,  {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  delete_category(id: number): Observable<any> {
    return this._httpClient.delete<any>(this.API_URL + 'category/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    }
    );
  }
   // size
   getallsize(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'size/', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  create_size(data:any): Observable<any> {
    return this._httpClient.post<any>(this.API_URL + 'size',data, {
      headers: {
        Authorization: this.code_tokens,
      },
    })
  }
  get_size(id: number): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'size/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    } )
  }
  update_size(id: number, data: any): Observable<any> {
    return this._httpClient.put<any>(this.API_URL + 'size/' + id, data, {
      headers: {
        Authorization: this.code_tokens,
      },
    } );
  }
  delete_size(id: number): Observable<any> {
    return this._httpClient.delete<any>(this.API_URL + 'size/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    }
    );
  }
  //
    // size
    getallcolor(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'color/', {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    create_color(data:any): Observable<any> {
      return this._httpClient.post<any>(this.API_URL + 'color',data, {
        headers: {
          Authorization: this.code_tokens,
        },
      })
    }
    get_color(id: number): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'color/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      } )
    }
    update_color(id: number, data: any): Observable<any> {
      return this._httpClient.put<any>(this.API_URL + 'color/' + id, data,  {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    delete_color(id: number): Observable<any> {
      return this._httpClient.delete<any>(this.API_URL + 'color/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      }
      );
    }

    //new
    getallnew(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'new/', {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    create_new(data:any): Observable<any> {
      return this._httpClient.post<any>(this.API_URL + 'new',data, {
        headers: {
          Authorization: this.code_tokens,
        },
      })
    }
    get_new(id: number): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'new/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      } )
    }
    update_new(id: number, data: any): Observable<any> {
      return this._httpClient.put<any>(this.API_URL + 'new/' + id, data,  {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    delete_new(id: number): Observable<any> {
      return this._httpClient.delete<any>(this.API_URL + 'new/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      }
      );
      
    }
    // product
    getallproduct(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'product/', {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    getsize(id: number): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'getsize/'+ id, {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    getcolor(id: number): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'getcolor/'+ id, {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    create_product(data:any): Observable<any> {
      return this._httpClient.post<any>(this.API_URL + 'product',data, {
        headers: {
          Authorization: this.code_tokens,
        },
      })
    }
    create_sizes(data:any): Observable<any> {
      return this._httpClient.post<any>(this.API_URL + 'create_size',data, {
        headers: {
          Authorization: this.code_tokens,
        },
      })
    }
    create_colors(data:any): Observable<any> {
      return this._httpClient.post<any>(this.API_URL + 'create_color',data, {
        headers: {
          Authorization: this.code_tokens,
        },
      })
    }
    get_product(id: number): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'product/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      } )
    }
    update_product(id: number, data: any): Observable<any> {
      return this._httpClient.post<any>(this.API_URL + 'product/' + id, data,  {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    update_colors(id: number, data: any): Observable<any> {
      return this._httpClient.put<any>(this.API_URL + 'edit_color/' + id, data, {
        headers: {
          Authorization: this.code_tokens,
        },
      } );
    }

    update_sizes(id: number, data: any): Observable<any> {
      return this._httpClient.put<any>(this.API_URL + 'edit_size/' + id, data, {
        headers: {
          Authorization: this.code_tokens,
        },
      } );
    }
    delete_product(id: number): Observable<any> {
      return this._httpClient.delete<any>(this.API_URL + 'product/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      }
      );
      
    }
    delete_sizes(id: number): Observable<any> {
      return this._httpClient.delete<any>(this.API_URL + 'delete_size/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      }
      );
      
    }
    delete_colors(id: number): Observable<any> {
      return this._httpClient.delete<any>(this.API_URL + 'delete_color/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      }
      );
      
    }
     //customer
     getallcustomer(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'customer/', {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    create_customer(data:any): Observable<any> {
      return this._httpClient.post<any>(this.API_URL + 'customer',data, {
        headers: {
          Authorization: this.code_tokens,
        },
      })
    }
    get_customer(id: number): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'customer/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      } )
    }
    update_customer(id: number, data: any): Observable<any> {
      return this._httpClient.put<any>(this.API_URL + 'customer/' + id, data, {
        headers: {
          Authorization: this.code_tokens,
        },
      } );
    }
    delete_customer(id: number): Observable<any> {
      return this._httpClient.delete<any>(this.API_URL + 'customer/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      }
      );
    }
    //oder
    getalloder(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'order/', {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }


    get_oder_detail_id(id: number): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'order_details/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      } )
    }

    get_all_oder_detail(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'order_detail/', {
      headers: {
        Authorization: this.code_tokens,
      },
    } )
    }
    get_order_processing(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'order_processing/', {
        headers: {
          Authorization: this.code_tokens,
        },
      } );
    }
    update_order_status(id: number, payment_status: number): Observable<any> {
      const body = { payment_status: payment_status };
      return this._httpClient.put<any>(this.API_URL + 'update_status_order/' + id, body, {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    update_status(id: number, data: any): Observable<any> {
      return this._httpClient.put<any>(this.API_URL + 'update_status_order/' + id, data, {
        headers: {
          Authorization: this.code_tokens,
        },
      } );
    }
    getall(): Observable<any> {
      return this._httpClient.get<any>(this.API_URL + 'home/', {
        headers: {
          Authorization: this.code_tokens,
        },
      });
    }
    delete_order(id: number): Observable<any> {
      return this._httpClient.delete<any>(this.API_URL + 'order/' + id, {
        headers: {
          Authorization: this.code_tokens,
        },
      }
      );
    }
    }
   
     // product
   




 

