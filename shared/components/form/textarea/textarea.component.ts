import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Quill } from './quill';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})

export class TextareaComponent implements OnInit, AfterContentInit {

  @Input() id: string;
  @Input() name: string;
  @Input() value: string;
  @Input() index: string;
  @Input() required: boolean;
  @Input() placeholder: string = "";

  constructor() { }

  ngAfterContentInit() { 
    window.setTimeout(() => {
      var toolbarOptions = [
        //  ['bold', 'italic', 'underline', 'strike'],
        //  ['blockquote', 'code-block'],
      
        // [{ 'header': 1 }, { 'header': 2 }],
        [ /*{ 'list': 'ordered'},*/ { 'list': 'bullet' }],
        //  [{ 'script': 'sub'}, { 'script': 'super' }],
        //  [{ 'indent': '-1'}, { 'indent': '+1' }],
        //  [{ 'direction': 'rtl' }],
      
        //  [{ 'size': ['small', false, 'large', 'huge'] }],
        //  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        //  [{ 'color': [] }, { 'background': [] }],
        //  [{ 'font': [] }],
        //  [{ 'align': [] }],
      
        //  ['clean']
      ];

      var quill = new Quill('#'+this.id + "Editor", {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: 'snow'
      });

      quill.clipboard.dangerouslyPasteHTML(0, this.value);
      quill.root.dataset.placeholder = this.placeholder ? this.placeholder : "";
    });
  }

  ngOnInit() {
  }
}