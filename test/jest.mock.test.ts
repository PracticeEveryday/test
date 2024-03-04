test('기본적으로 Undefined를 반환합니다.', () => {
  const mock = jest.fn();

  const result = mock('foo');

  expect(result).toBeUndefined();
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith('foo');
});

test('모의 구현', () => {
  const mock = jest.fn((val) => 'bar');

  expect(mock('foo')).toBe('bar');
  expect(mock).toHaveBeenCalledWith('foo');
});

test('모의 구현 V2', () => {
  const mock = jest.fn().mockImplementation((val) => 'bar');

  const result = mock('foo');
  expect(result).toBe('bar');
  expect(mock).toHaveBeenCalledWith('foo');
});

test('모의 구현 한 번만 사용하기', () => {
  const mock = jest.fn().mockImplementationOnce((val) => 'bar');

  const result = mock('foo');
  expect(result).toBe('bar');
  expect(mock).toHaveBeenCalledWith('foo');

  const result2 = mock('baz');
  expect(result2).toBe(undefined);
  expect(mock).toHaveBeenCalledWith('baz');
});

test('반환 값 모킹하기', () => {
  const mock = jest.fn();
  mock.mockReturnValue('bar');

  const result = mock('foo');
  expect(result).toBe('bar');
  expect(mock).toHaveBeenCalledWith('foo');
});

test('Promise 모킹하기', () => {
  const mock = jest.fn();
  mock.mockResolvedValue('bar');

  const result = mock('foo');
  expect(result).resolves.toBe('bar');
  expect(mock).toHaveBeenCalledWith('foo');
});
