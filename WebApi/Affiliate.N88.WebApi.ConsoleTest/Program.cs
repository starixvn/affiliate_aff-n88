using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Refit;

namespace Affiliate.N88.WebApi.ConsoleTest
{
    internal class Program
    {
        private static async Task Main(string[] args)
        {
            var leagueApi = RestService.For<ILeagueApi>("http://localhost:57842/api/");

            var leagues = await leagueApi.GetLeagues();

            Console.WriteLine(JsonConvert.SerializeObject(leagues));
            Console.ReadLine();
        }
    }

    public interface ILeagueApi
    {
        [Get("/test/TestMySql")]
        Task<IEnumerable<League>> GetLeagues();
    }

    public class League
    {
        public League(string id, string name)
        {
            Id = id;
            Name = name;
        }

        public string Id { get; }

        public string Name { get; }
    }
}