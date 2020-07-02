using System;
using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO;
using System.Data;

namespace Fanex.Affiliate.User.Core.Repository
{
    public class SecurityQuestionRepository : ISecurityQuestionRepository
    {
        private readonly IObjectDBBuilder _builder;

        public SecurityQuestionRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }
        public IEnumerable<SecurityQuestion> GetSecurityQuestions(string language)
        {
            const string spKey = "Aff_User_SecurityQuestions_Sel";

            var securityQuestionList = new List<SecurityQuestion>();

            using (var objectDb = _builder.Build(spKey))
            {
                objectDb.AddInParameter("Language", SqlDbType.VarChar, language);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        securityQuestionList.Add(new SecurityQuestion
                        {
                            QuestionId = Convert.ToByte(reader["QuestionID"]),
                            Question = Convert.ToString(reader["Question"])
                        });
                    }
                }
            }

            return securityQuestionList;
        }
    }
}
