using System;
using System.Collections.Generic;
using System.Text;

namespace Affiliate.N88.Infrastructure.Exceptions
{
    public class ImporterException : Exception
    {
        public ImporterException()
        {
        }

        public ImporterException(string message)
            : base(message)
        {
        }

        public ImporterException(string errorCode, string errorMessage, string xmlData)
            : base($"Import fail - {errorCode} - {errorMessage}\n{xmlData}")
        {
        }

        public ImporterException(string message, Exception exception)
            : base(message, exception)
        {
        }
    }
}
