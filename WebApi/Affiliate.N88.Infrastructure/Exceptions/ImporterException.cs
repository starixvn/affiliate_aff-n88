using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Affiliate.N88.Exceptions
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

        public ImporterException(int errorCode, string errMessage)
            : base($"Import fail - {errorCode} - {errMessage}")
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
