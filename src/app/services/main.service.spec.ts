import { TestBed } from '@angular/core/testing';
import { MainService } from './main.service';
import { ValueService } from './value.service';

describe('MainService', () => {
  let mainService: MainService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;
  const spy = jasmine.createSpyObj('ValueService', ['getValue']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainService,
        { provide: ValueService, useValue: spy }
      ]
    });
    mainService = TestBed.inject(MainService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(mainService).toBeTruthy();
  });

  it('should call getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('other value');
    expect(mainService.getValue()).toBe('other value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

});
