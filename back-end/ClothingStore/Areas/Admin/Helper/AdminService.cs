using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ClothingStore.Areas.Admin.Helper
{
    public class AdminService
    {
        public async Task<string> UploadImageProduct(string webRootPath, IFormFile imageData, Guid productId, Guid colorId)
        {
            string fileStoreAvatar = "", filePath = "";
            // Saving Image on Server
            if (imageData.Length > 0)
            {
                fileStoreAvatar = Path.GetFullPath(webRootPath + "\\images\\products\\" + productId.ToString());
                if (!Directory.Exists(fileStoreAvatar))
                {
                    Directory.CreateDirectory(fileStoreAvatar);
                }
                filePath = Path.Combine(fileStoreAvatar, colorId.ToString() + ".jpg");
                using (var stream = System.IO.File.Create(filePath))
                {
                    await imageData.CopyToAsync(stream);
                }
            }
            //return filePath;

            string urlHost = "images/products/" + productId.ToString() + "/" + colorId.ToString() + ".jpg";
            return urlHost;
        }
    }
}
