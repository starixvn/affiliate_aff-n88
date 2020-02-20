namespace Affiliate.N88.WebApi.ConsoleTest
{
    using System;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using Refit;

    public class Program
    {
        private static async Task Main(string[] args)
        {
            ////    var affiliateApi = RestService.For<IAffiliateApi>("http://localhost:57842/api/");

            ////    var affiliates = await affiliateApi.GetAffiliates();

            ////    Console.WriteLine(JsonConvert.SerializeObject(affiliates));
            Console.ReadLine();
        }
    }
}