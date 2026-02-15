"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildComponentSpec = buildComponentSpec;
function buildComponentSpec(spec) {
    return `
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${spec.className}Component } from './${spec.name}.component';

describe('${spec.className}Component', () => {
  let component: ${spec.className}Component;
  let fixture: ComponentFixture<${spec.className}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${spec.className}Component]
    }).compileComponents();

    fixture = TestBed.createComponent(${spec.className}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;
}
