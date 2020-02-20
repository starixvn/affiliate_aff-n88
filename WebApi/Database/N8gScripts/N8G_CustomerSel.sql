DROP PROCEDURE IF EXISTS N8G_CustomerSel;
DELIMITER //

CREATE PROCEDURE N8G_CustomerSel(
		IN fromDate DATETIME
    	/*
			Creator: Hubert@20200220
            DB: 10.18.200.109/Siebog
			Task: Select customers have registation time from fromDate to now
			Params:
					- regTime: registation time
			Revisions:
					- 20200220@Hubert: Create        
		*/
	)
BEGIN
	SELECT CustId, SiteId, UserName, Userpwd, CurrencyId, UserLang, ActStatus, AgentId, AllAgentId, UserLevel, LastLoginTime, RegTime, IsTest, IsKyc, IsRisk, Status
	FROM Customer c
	WHERE c.RegTime >= fromDate;
END;

//
DELIMITER ;

CALL N8G_CustomerSel('2020-02-10');