import { Public } from '../public.decorators';

describe('Public Decorator', () => {
  it('should set metadata correctly', () => {
    // Define a key for the metadata
    const metadataKey = 'isPublic';

    // Create a mock target class
    class TestClass {}

    // Apply the decorator to the class
    Public()(TestClass);

    // Retrieve metadata using the SetMetadata function
    const metadata = Reflect.getMetadata(metadataKey, TestClass);

    // Assert that metadata is set to true
    expect(metadata).toBeTruthy();
  });
  it('should not set metadata if decorator not applied', () => {
    // Define a key for the metadata
    const metadataKey = 'isPublic';

    // Create a mock target class
    class TestClass {}

    // Do not apply the decorator to the class

    // Retrieve metadata using the SetMetadata function
    const metadata = Reflect.getMetadata(metadataKey, TestClass);

    // Assert that metadata is not set
    expect(metadata).toBeUndefined();
  });
});
