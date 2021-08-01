import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  response: Observable<any>;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private youtubeService: YoutubeService,
    private cdr: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      keyword: ['', [Validators.required]],
    });

    this.initialListener();
  }

  initialListener() {
    this.searchForm
      .get('keyword')
      .valueChanges.pipe(
        debounceTime(500),
        tap((val) => this.searchYoutubeAPI(val))
      )
      .subscribe();
  }

  searchYoutubeAPI(keyword) {
    console.log('response');
    this.isLoading = true;
    this.response = this.youtubeService.searchYoutubeAPI(keyword);
    this.cdr.detectChanges();
    this.isLoading = false;
  }
  ngOnInit(): void {}
}
