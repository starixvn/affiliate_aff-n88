using Fanex.Affiliate.User.Core.Constants;
using System;
using System.Security.Cryptography;

namespace Fanex.Affiliate.User.Core.Utilities
{
    public static class RandomHelper
    {
        private const int ByteLengthOfInt = 4;

        public static int GetInt32Random(int min, int max)
        {
            return HandleInt32Random(min, max, true);
        }

        public static int GetInt32Random(int max = int.MaxValue)
        {
            return HandleInt32Random(Number.Zero, max);
        }

        private static int HandleInt32Random(int min, int max, bool isRandomRange = false)
        {
            if (min == max)
            {
                return min;
            }

            var minValue = min;
            var maxValue = max;

            byte[] data = new byte[ByteLengthOfInt];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(data);

                var randomValue = Math.Abs(BitConverter.ToInt32(data, Number.Zero));
                var rangeValue = Math.Abs((long)maxValue - minValue);

                if (minValue < Number.Zero && maxValue > Number.Zero)
                {
                    rangeValue = Math.Abs((long)minValue) + maxValue;
                }

                if (isRandomRange)
                {
                    rangeValue++;
                }

                return minValue + Convert.ToInt32(randomValue % rangeValue);
            }
        }
    }
}
