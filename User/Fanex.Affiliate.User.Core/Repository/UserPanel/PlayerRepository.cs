namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    using System;
    using Fanex.Affiliate.User.Core.Constants;
    using Fanex.Affiliate.User.Core.DTO.UserPanel;
    using Fanex.Affiliate.User.Core.MetalModels.UserPanel;

    public class PlayerRepository : IPlayerRepository
    {
        private readonly IObjectDBBuilder _builder;

        public PlayerRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }

        public PlayerListResult GetPlayerList(PlayerListParam param)
        {
            const string nRows = "NRows";
            const string uSpKey = "Aff_User_Member_Sel";

            var result = new PlayerListResult();
            using (var db = _builder.Build(uSpKey))
            {
                db.SetParameterValue(nRows, DefaultValue.Int);

                result.Items = db.Query<PlayerDetail>(param);
                result.TotalRow = Convert.ToInt32(db.GetOutputParams()[nRows]);

                return result;
            }
        }
    }
}