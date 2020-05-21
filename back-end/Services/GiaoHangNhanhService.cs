using Microsoft.AspNetCore.Mvc;
using Models.Helpers;
using Models.ViewModels;
using Models.ViewModels.GHN;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class GiaoHangNhanhService
    {
        public async Task<List<GHNLocations>> GetLocations()
        {
            //Khai báo
            string baseUrl = "https://console.ghn.vn/api/v1/apiv3/GetDistricts";
            Dictionary<string, string> headers = new Dictionary<string, string>();
            List<GHNLocations> districts = new List<GHNLocations>();

            //Cái này là GET
            //using (HttpClient client = new HttpClient())
            //using (HttpResponseMessage res = await client.GetAsync(baseUrl))
            //using (HttpContent content = res.Content)
            //{
            //    string data = await content.ReadAsStringAsync();
            //    if (data != null)
            //    {
            //        Console.WriteLine(data);
            //    }
            //}

            //Cái này là POST
            TokenGHN token = new TokenGHN();
            token.Token = "5dce3e3f0ad5df75487e7654";
            var json = JsonConvert.SerializeObject(token);

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage();
            httpRequestMessage.Method = HttpMethod.Post;
            httpRequestMessage.RequestUri = new Uri(baseUrl);
            httpRequestMessage.Headers.Add("Accept", "application/json");
            httpRequestMessage.Headers.Add("Accept", "application/json");
            
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            httpRequestMessage.Content = httpContent;

            HttpClient _Client = new HttpClient();
            HttpResponseMessage res = await _Client.SendAsync(httpRequestMessage);
            using (HttpContent content = res.Content)
            {
                string data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    //code || msg || data
                    JObject result = JObject.Parse(data);
                    var districtsArray = result["data"].Value<JArray>();
                    districts = districtsArray.ToObject<List<GHNLocations>>();
                }
            }

            return districts;
        }

        public async Task<List<District>> GetDistricts()
        {
            List<GHNLocations> locations = await GetLocations();

            List<District> districts = locations.Select(l => new District
                                                {
                                                    DistrictId = l.DistrictId,
                                                    DistrictName = l.DistrictName
                                                })
                                                .ToList();

            return districts;
        }

        public async Task<List<District>> GetDistrictsByProvinceId(int provinceId)
        {
            List<GHNLocations> locations = await GetLocations();
            
            List<District> districts = locations.Where(l => l.ProvinceId == provinceId)
                                                .Select(l => new District
                                                {
                                                    DistrictId = l.DistrictId,
                                                    DistrictName = l.DistrictName
                                                })
                                                .ToList();

            return districts;
        }

        public async Task<List<District>> GetDistrictsByProvinceName(string provinceName)
        {
            List<GHNLocations> locations = await GetLocations();

            List<District> districts = locations.Where(l => l.ProvinceName == provinceName)
                                                .Select(l => new District
                                                {
                                                    DistrictId = l.DistrictId,
                                                    DistrictName = l.DistrictName
                                                })
                                                .ToList();

            return districts;
        }

        public async Task<District> GetDistrictByProvinceAndDistrictName(string provinceName, string districtName)
        {
            List<GHNLocations> locations = await GetLocations();

            District district = locations.Where(l => l.ProvinceName == provinceName && l.DistrictName.Contains(districtName))
                                          .Select(l => new District
                                          {
                                              DistrictId = l.DistrictId,
                                              DistrictName = l.DistrictName
                                          })
                                          .FirstOrDefault();

            return district;
        }

        public async Task<List<Province>> GetProvinces()
        {
            List<GHNLocations> locations = await GetLocations();

            List<int> provinceIds = locations.Select(l => l.ProvinceId)
                                             .Distinct()
                                             .ToList();

            List<Province> provinces = new List<Province>();
            foreach (int id in provinceIds)
            {
                provinces.Add(locations.Where(l => l.ProvinceId == id)
                                       .Select(l => new Province
                                       {
                                           ProvinceId = l.ProvinceId,
                                           ProvinceName = l.ProvinceName
                                       })
                                       .FirstOrDefault());
            }

            return provinces;
        }

        public async Task<Province> GetProvinceByProvinceId(int provinceId)
        {
            List<GHNLocations> locations = await GetLocations();

            Province province = locations.Where(l => l.ProvinceId == provinceId)
                                         .Select(l => new Province
                                         {
                                             ProvinceId = l.ProvinceId,
                                             ProvinceName = l.ProvinceName
                                         })
                                         .FirstOrDefault();

            return province;
        }

        public async Task<Province> GetProvinceByProvinceName(string provinceName)
        {
            List<GHNLocations> locations = await GetLocations();

            Province province = locations.Where(l => l.ProvinceName.Contains(provinceName))
                                         .Select(l => new Province
                                         {
                                             ProvinceId = l.ProvinceId,
                                             ProvinceName = l.ProvinceName
                                         })
                                         .FirstOrDefault();

            return province;
        }

        public async Task<List<GHNWards>> GetGHNWards()
        {
            //Khai báo
            string baseUrl = "https://console.ghn.vn/api/v1/apiv3/GetWards";
            Dictionary<string, string> headers = new Dictionary<string, string>();
            List<GHNWards> wards = new List<GHNWards>();

            //Cái này là POST
            TokenGHN token = new TokenGHN();
            token.Token = "5dce3e3f0ad5df75487e7654";
            var json = JsonConvert.SerializeObject(token);

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage();
            httpRequestMessage.Method = HttpMethod.Post;
            httpRequestMessage.RequestUri = new Uri(baseUrl);
            httpRequestMessage.Headers.Add("Accept", "application/json");
            httpRequestMessage.Headers.Add("Accept", "application/json");

            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            httpRequestMessage.Content = httpContent;

            HttpClient _Client = new HttpClient();
            HttpResponseMessage res = await _Client.SendAsync(httpRequestMessage);
            using (HttpContent content = res.Content)
            {
                string data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    //code || msg || data
                    JObject result = JObject.Parse(data);
                    var wardsArray = result["data"]["Wards"].Value<JArray>();
                    wards = wardsArray.ToObject<List<GHNWards>>();
                }
            }

            return wards;
        }

        public async Task<List<Ward>> GetWards(int provinceId, int districtId)
        {
            List<GHNWards> ghnWards = await GetGHNWards();

            List<Ward> wards = ghnWards.Where(l => l.ProvinceId == provinceId && l.DistrictId == districtId)
                                       .Select(l => new Ward
                                       {
                                           WardCode = l.WardCode,
                                           WardName = l.WardName
                                       })
                                       .ToList();

            return wards;
        }

        public async Task<Fee> GetFee(int districtId, int numberOfProducts)
        {
            District district = await GetDistrictByProvinceAndDistrictName("Hồ Chí Minh", "Quận 5");

            //Khai báo
            string baseUrl = "https://console.ghn.vn/api/v1/apiv3/CalculateFee";
            Dictionary<string, string> headers = new Dictionary<string, string>();
            Fee fee = new Fee();
            Service service = await GetService(districtId);

            //Cái này là POST
            FeeRequest feeRequest = new FeeRequest();
            feeRequest.Token = "5dce3e3f0ad5df75487e7654";
            feeRequest.FromDistrictId = district.DistrictId; //Quận 5
            feeRequest.ToDistrictId = districtId; //Test
            feeRequest.ServiceId = service.ServiceId; //defaultService
            feeRequest.Weight = 300 * numberOfProducts; //Test
            var json = JsonConvert.SerializeObject(feeRequest);

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage();
            httpRequestMessage.Method = HttpMethod.Post;
            httpRequestMessage.RequestUri = new Uri(baseUrl);
            httpRequestMessage.Headers.Add("Accept", "application/json");
            httpRequestMessage.Headers.Add("Accept", "application/json");

            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            httpRequestMessage.Content = httpContent;

            HttpClient _Client = new HttpClient();
            HttpResponseMessage res = await _Client.SendAsync(httpRequestMessage);
            using (HttpContent content = res.Content)
            {
                string data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    //code || msg || data
                    JObject result = JObject.Parse(data);
                    var calculatedFee = result["data"]["CalculatedFee"].Value<JValue>();
                    fee.TotalFee = calculatedFee.ToObject<int>();
                }
            }

            return fee;
        }

        public async Task<Service> GetService(int districtId)
        {
            District district = await GetDistrictByProvinceAndDistrictName("Hồ Chí Minh", "Quận 5");

            //Khai báo
            string baseUrl = "https://console.ghn.vn/api/v1/apiv3/FindAvailableServices";
            Dictionary<string, string> headers = new Dictionary<string, string>();
            Service service = new Service();

            //Cái này là POST
            FeeRequest feeRequest = new FeeRequest();
            feeRequest.Token = "5dce3e3f0ad5df75487e7654";
            feeRequest.FromDistrictId = district.DistrictId; //Quận 5
            feeRequest.ToDistrictId = districtId; //Test
            var json = JsonConvert.SerializeObject(feeRequest);

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage();
            httpRequestMessage.Method = HttpMethod.Post;
            httpRequestMessage.RequestUri = new Uri(baseUrl);
            httpRequestMessage.Headers.Add("Accept", "application/json");
            httpRequestMessage.Headers.Add("Accept", "application/json");

            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            httpRequestMessage.Content = httpContent;

            HttpClient _Client = new HttpClient();
            HttpResponseMessage res = await _Client.SendAsync(httpRequestMessage);
            using (HttpContent content = res.Content)
            {
                string data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    //code || msg || data
                    JObject result = JObject.Parse(data);
                    var serviceId = result["data"][0]["ServiceID"].Value<JValue>();
                    service.ServiceId = serviceId.ToObject<int>();
                }
            }

            return service;
        }
    }
}
