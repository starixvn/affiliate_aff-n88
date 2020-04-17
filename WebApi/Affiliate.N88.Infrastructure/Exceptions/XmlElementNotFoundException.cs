using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Exceptions
{
    [Serializable]
    public class XmlElementNotFoundException : Exception
    {
        public XmlElementNotFoundException(string message) : base(message)
        {
        }

        public XmlElementNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public XmlElementNotFoundException()
        {
        }

        protected XmlElementNotFoundException(System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext)
        {
            throw new NotImplementedException();
        }
    }
}
