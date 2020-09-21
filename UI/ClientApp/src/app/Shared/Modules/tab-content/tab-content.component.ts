import { Component, OnInit, ContentChildren, QueryList, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import {CandidateService} from '../../../Core/Services/candidate.service';
import { DynamicTabDirective } from '../../directives/dynamic-tab.directive';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {
  dynamicTabs: TabsComponent[] = [];
 
  @ContentChildren(TabsComponent) tabs: QueryList<TabsComponent>;
  @ViewChild(DynamicTabDirective, {static:true}) dynamicTabPlaceholder : DynamicTabDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
    private CandidateService: CandidateService) 
    { }

  ngOnInit(): void {
  }
  
  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: TabsComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));
    tab.active = true;
  }

  openTab(title: string, template, data, isCloseable = false) 
  {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      TabsComponent
    );

    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance: TabsComponent = componentRef.instance as TabsComponent;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    this.dynamicTabs.push(componentRef.instance as TabsComponent);

    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);

    this.CandidateService.getCandidateInfoEdit(data);
  }

  closeTab(tab: TabsComponent) 
  {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {

        this.dynamicTabs.splice(i, 1);

        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        viewContainerRef.remove(i);

        this.selectTab(this.tabs.first);
        break;
      }
    }
  }
  
  closeActiveTab() 
  {
    const activeTabs = this.dynamicTabs.filter(tab => tab.active);
    if (activeTabs.length > 0) {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }
}
