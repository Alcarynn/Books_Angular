import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 import {map, startWith} from 'rxjs/operators';

import { Publisher } from '../book';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-search',
  templateUrl: './publisher-search.component.html',
  styleUrls: [ './publisher-search.component.css' ]
})
export class PublisherSearchComponent implements OnInit {
  
  myControl = new FormControl();
  publishers$: Observable<Publisher[]>;
  selectedPublisher: Publisher;
  private searchTerms = new Subject<string>();

  constructor(private publisherService: PublisherService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onSelect(publisher: Publisher): void {
    this.selectedPublisher = publisher;
  }

  ngOnInit(): void {
    this.publishers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.publisherService.searchPublishers(term)),
    );
  }

  displayFn(publisher?: Publisher): string | undefined {
    return publisher ? publisher.name : undefined;
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/