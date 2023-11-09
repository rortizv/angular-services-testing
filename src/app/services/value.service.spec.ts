import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getValue', () => {
    it('should return "Any value"', () => {
      const value = service.getValue();
      expect(value).toEqual('Any value');
    });
  });

  describe('Tests for setValue', () => {
    it('should set value to "Any value"', () => {
      expect(service.getValue()).toBe('Any value');
      service.setValue('Changed value');
      expect(service.getValue()).toBe('Changed value');
    });
  });

  describe('Tests for getPromiseValue', () => {
    it('should return "Promise value" from a Promise', async () => {
      const value = await service.getPromiseValue();
      expect(value).toEqual('Promise value');
    });
  });

  describe('Tests for getObservableValue', () => {
    it('should return "Observable value" from an Observable', (done: DoneFn) => {
      service.getObservableValue().subscribe(value => {
        expect(value).toEqual('Observable value');
        done();
      });
    });
  });

});
