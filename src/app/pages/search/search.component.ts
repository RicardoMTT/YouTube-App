import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder, private youtubeService: YoutubeService) {
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
    this.youtubeService.searchYoutubeAPI(keyword).subscribe();
  }
  ngOnInit(): void {}
}
