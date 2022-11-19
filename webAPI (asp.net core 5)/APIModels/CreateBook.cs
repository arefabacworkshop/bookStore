using Microsoft.AspNetCore.Http;

namespace BookStoreApi.APIModels
{
    public class CreateBook
    {
        public IFormFile file { get; set; }
        public IFormCollection bookData { get; set; }
        public IFormCollection listOfWriters { get; set; }
        public IFormCollection listOfCategories { get; set; }
        public IFormCollection listOfPublishers { get; set; }
        public IFormCollection listOfTranslators { get; set; }
    }
}
