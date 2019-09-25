import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css']
})
export class NavButtonComponent implements OnInit {

  @Input() icon: any;
  @Input() text: any;
  @Input() url: any;

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  navigate(url) {
    if(url) {
      this.router.navigate([ url ], { relativeTo: this.activeRoute });
    } else {
      window.history.back();
    }
  }
}
