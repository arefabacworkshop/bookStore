using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreApi.Models
{
    public class UploadedFile
    {
        public int id { get; set; }
        public string name { get; set; }
        public string filePath { get; set; }
        public string describe { get; set; }
        public string fileType { get; set; }

    }
}
