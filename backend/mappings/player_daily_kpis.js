
const kpis =
{
  "properties": {
    "aboutMe": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "accountStatus": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "accountStatusCode": {
      "type": "long"
    },
    "activationCode": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "actualRevenue": {
      "type": "float"
    },
    "address": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "affiliatePromoStatus": {
      "type": "long"
    },
    "avatarImage": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "backCardType": {
      "type": "long"
    },
    "backgroundType": {
      "type": "long"
    },
    "bonnusPointsUpdated": {
      "type": "long"
    },
    "bonusAmount": {
      "type": "float"
    },
    "bonusBalance": {
      "type": "float"
    },
    "bonusDepositBalance": {
      "type": "long"
    },
    "bonusPromoBalance": {
      "type": "float"
    },
    "bonusRevenue": {
      "type": "float"
    },
    "bonusTotBalance": {
      "type": "float"
    },
    "bonusTransCount": {
      "type": "integer"
    },
    "bonusWinBalance": {
      "type": "long"
    },
    "campaignLeadId": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "campaignLeadactId": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "chatStatus": {
      "type": "long"
    },
    "city": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "contact": {
      "type": "long"
    },
    "country": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "customer": {
      "type": "keyword"
    },
    "dateOfBirth": {
      "type": "long"
    },
    "defaultPoints": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "depositAmount": {
      "type": "float"
    },
    "depositBalance": {
      "type": "float"
    },
    "deposits": {
      "type": "integer"
    },
    "email": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "emailNotification": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "emailStatus": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "emailStatusCode": {
      "type": "long"
    },
    "facebookId": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "firstName": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "frbStatus": {
      "type": "long"
    },
    "frontCardType": {
      "type": "long"
    },
    "ftd": {
      "type": "long"
    },
    "ftdAmount": {
      "type": "long"
    },
    "gameControls": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "gender": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "googleId": {
      "type": "long"
    },
    "hackCount": {
      "type": "long"
    },
    "hands": {
      "type": "float"
    },
    "headsUpHands": {
      "type": "float"
    },
    "id": {
      "type": "keyword"
    },
    "image": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "instantBalance": {
      "type": "float"
    },
    "instantDepositBalance": {
      "type": "long"
    },
    "instantPointsUpdated": {
      "type": "long"
    },
    "instantPromoBalance": {
      "type": "long"
    },
    "instantTotBalance": {
      "type": "float"
    },
    "instantWinBalance": {
      "type": "float"
    },
    "lastLogin": {
      "type": "date",
      "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
    },
    "lastName": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "lastUpdated": {
      "type": "long"
    },
    "levelConfigId": {
      "type": "long"
    },
    "levelPoints": {
      "type": "long"
    },
    "locale": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "loginStatus": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "loginStatusCode": {
      "type": "long"
    },
    "macId": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "membershipDate": {
      "type": "long"
    },
    "membershipFlag": {
      "type": "long"
    },
    "membershipId": {
      "type": "long"
    },
    "msg": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "multiColourDeck": {
      "type": "long"
    },
    "nameAsInBank": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "newsletterIsSubscribed": {
      "type": "long"
    },
    "panStatus": {
      "type": "long"
    },
    "partnerId": {
      "type": "long"
    },
    "partnerName": {
      "type": "keyword"
    },
    "partnerType": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "pot": {
      "type": "float"
    },
    "proPlayerImg": {
      "type": "long"
    },
    "promoBalance": {
      "type": "float"
    },
    "promoCampaignId": {
      "type": "long"
    },
    "promoCampaignName": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "rafCreatedDate": {
      "type": "long"
    },
    "rakeBalance": {
      "type": "float"
    },
    "realBalance": {
      "type": "float"
    },
    "realRevenue": {
      "type": "float"
    },
    "referredBy": {
      "type": "long"
    },
    "registrationCode": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "registrationTimestamp": {
      "type": "long"
    },
    "registrationType": {
      "type": "long"
    },
    "relationshipStatus": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "revenue": {
      "type": "float"
    },
    "serviceTax": {
      "type": "float"
    },
    "sfsId": {
      "type": "long"
    },
    "sfsRoomId": {
      "type": "long"
    },
    "skillCoins": {
      "type": "long"
    },
    "soundType": {
      "type": "long"
    },
    "stake": {
      "type": "float"
    },
    "state": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "street": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "tableType": {
      "type": "long"
    },
    "tierLevelId": {
      "type": "long"
    },
    "time": {
      "type": "text"
    },
    "timestamp": {
      "type": "date",
      "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
    },
    "totBalance": {
      "type": "float"
    },
    "transactions": {
      "type": "integer"
    },
    "updated": {
      "type": "long"
    },
    "userId": {
      "type": "long"
    },
    "username": {
      "type": "keyword"
    },
    "usernameText": {
      "type": "text"
    },
    "win": {
      "type": "float"
    },
    "winBalance": {
      "type": "float"
    },
    "withdrawApproved": {
      "type": "float"
    },
    "withdrawPaid": {
      "type": "float"
    },
    "withdrawPending": {
      "type": "float"
    },
    "xpPoints": {
      "type": "long"
    },
    "zipCode": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    }
  }
}


module.exports = {
  kpis
}