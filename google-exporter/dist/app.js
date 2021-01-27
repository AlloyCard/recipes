/*! For license information please see app.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("aws-sdk")):"function"==typeof define&&define.amd?define(["aws-sdk"],t):"object"==typeof exports?exports.app=t(require("aws-sdk")):e.app=t(e["aws-sdk"])}(global,(function(e){return(()=>{var t={500:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AlloyJS=void 0;const s=o(n(5509)),a=o(n(4423)),u=o(n(2200));i(n(8643),t),i(n(5509),t),i(n(774),t),i(n(4423),t),i(n(1598),t),i(n(6086),t),i(n(4307),t),i(n(3482),t),i(n(4032),t),i(n(1123),t),i(n(1681),t),i(n(7337),t),i(n(4338),t),i(n(7557),t),i(n(2989),t),i(n(4600),t),i(n(2981),t),i(n(5625),t);class c{constructor(e){this.config=e,u.default.configure({region:e.region,userPoolId:e.userPoolId,userPoolWebClientId:e.userPoolClienId})}static configure(e){this.instance=new c(e),a.default.configure({serverUrl:e.serverUrl,fetch:e.fetch}),s.default.addSubscriber((e=>{a.default.setAuthToken(e)})),a.default.addExceptionSubscriber((e=>{e&&e.errors&&e.errors.forEach((e=>{if(e.extensions&&e.extensions["com.alloycard.EntityExceptionType"])switch(e.extensions["com.alloycard.EntityExceptionType"]){case"com.alloycard.graphql.engine.AuthenticationException":s.default.logout()}}))}))}static config(){return this.instance.config}}t.AlloyJS=c,t.configure=c.configure,t.default=c},1681:(e,t)=>{"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.Account=t.Address=t.State=void 0,(n=t.State||(t.State={})).AL="Alabama",n.AK="Alaska",n.AS="American Samoa",n.AZ="Arizona",n.AR="Arkansas",n.CA="California",n.CO="Colorado",n.CT="Connecticut",n.DE="Delaware",n.DC="District Of Columbia",n.FM="Federated States Of Micronesia",n.FL="Florida",n.GA="Georgia",n.GU="Guam",n.HI="Hawaii",n.ID="Idaho",n.IL="Illinois",n.IN="Indiana",n.IA="Iowa",n.KS="Kansas",n.KY="Kentucky",n.LA="Louisiana",n.ME="Maine",n.MH="Marshall Islands",n.MD="Maryland",n.MA="Massachusetts",n.MI="Michigan",n.MN="Minnesota",n.MS="Mississippi",n.MO="Missouri",n.MT="Montana",n.NE="Nebraska",n.NV="Nevada",n.NH="New Hampshire",n.NJ="New Jersey",n.NM="New Mexico",n.NY="New York",n.NC="North Carolina",n.ND="North Dakota",n.MP="Northern Mariana Islands",n.OH="Ohio",n.OK="Oklahoma",n.OR="Oregon",n.PW="Palau",n.PA="Pennsylvania",n.PR="Puerto Rico",n.RI="Rhode Island",n.SC="South Carolina",n.SD="South Dakota",n.TN="Tennessee",n.TX="Texas",n.UT="Utah",n.VT="Vermont",n.VI="Virgin Islands",n.VA="Virginia",n.WA="Washington",n.WV="West Virginia",n.WI="Wisconsin",n.WY="Wyoming";class r{constructor(e){this.street=e.street,this.complement=e.complement,this.city=e.city,this.state=e.state,this.zipCode=e.zipCode}}t.Address=r;class i{constructor(e){this.balance=0|e.balance,e.address&&(this.address=new r(e.address))}}t.Account=i,t.default=i},7337:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AlloyEvent=void 0;class n{constructor(e){this._alloyCardType=e._alloyCardType,this.eventId=e.eventId,this.createdAt=e.createdAt}}t.AlloyEvent=n,t.default=n},4338:(e,t)=>{"use strict";var n,r,i;Object.defineProperty(t,"__esModule",{value:!0}),t.SpendingLimit=t.SpendingLimitPeriod=t.CardControls=t.Card=t.CardStatus=t.CardMedia=void 0,(r=t.CardMedia||(t.CardMedia={})).VIRTUAL="VIRTUAL",r.PLASTIC="PLASTIC",r.METAL="METAL",r.LINKED="LINKED",function(e){e.PENDING="PENDING",e.PRINTED="PRINTED",e.NOT_ACTIVATED="NOT_ACTIVATED",e.ACTIVE="ACTIVE",e.TERMINATED="TERMINATED",e.CANCELLING="CANCELLING"}(n=t.CardStatus||(t.CardStatus={}));class o{constructor(e){this.id=e.id,this.name=e.name,this.lastFour=e.lastFour,this.expirationDate=e.expirationDate,this.media=e.media,this.status=e.status,e.cardControls&&(this.cardControls=new s(e.cardControls))}canCancel(){return this.status!=n.CANCELLING&&this.status!=n.TERMINATED}canReissue(){return this.status!=n.TERMINATED}}t.Card=o;class s{constructor(e){e.spendingLimit&&(this.spendingLimit=new a(e.spendingLimit))}}t.CardControls=s,(i=t.SpendingLimitPeriod||(t.SpendingLimitPeriod={})).Day="P1D",i.Week="P7D",i.Month="P1M",i.Year="P1Y",i.Forever="P99Y";class a{constructor(e){this.amount=e.amount,this.period=e.period,this.reset=e.reset,this.active=e.active}}t.SpendingLimit=a,t.default=o},7557:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentTemplate=t.Component=void 0,t.Component=class{constructor(e){this.type=e.type,this.props=e.props,this.children=e.children}};class n{constructor(){this.components=[]}}t.ComponentTemplate=n,t.default=n},2989:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.RecipeFile=t.RecipePanel=t.RecipeTemplate=t.Recipe=void 0;const i=r(n(4600));t.Recipe=class{constructor(e){this.id=e.id,this.name=e.name,this.description=e.description,this.iconUrl=e.iconUrl,this.screenShotsUrl=e.screenShotsUrl,this.madeBy=e.madeBy,this.installCount=e.installCount,this.ratingCount=e.ratingCount,e.templates&&(this.templates=e.templates.map((e=>new o(e)))),e.files&&(this.files=e.files.map((e=>new s(e)))),this.code=e.code}getTemplate(e){var t;return null===(t=this.templates)||void 0===t?void 0:t.find((t=>t.name===e))}};class o{constructor(e){this.name=e.name,this.components=e.components}}t.RecipeTemplate=o,t.RecipePanel=class{constructor(e){this.id=e.id,this.data=e.data,this.recipeInstall=new i.default(e.recipeInstall),"string"==typeof e.data&&(this.data=JSON.parse(e.data)),this.templateFile=new s(e.templateFile)}};class s{constructor(e){this.fileName=e.fileName,this.eTag=e.eTag,this.url=e.url,this.type=e.type}}t.RecipeFile=s},4600:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RecipeInstall=void 0;const r=n(2989);class i{constructor(e){this.id=e.id,this.configuration=e.configuration,this.recipe=new r.Recipe(e.recipe),"string"==typeof e.configuration&&(this.configuration=JSON.parse(e.configuration))}}t.RecipeInstall=i,t.default=i},1123:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Transaction=t.TransactionStatus=void 0;const i=r(n(4338)),o=n(2989);var s,a;(a=t.TransactionStatus||(t.TransactionStatus={})).PENDING="PENDING",a.SETLLED="SETTLED",a.REFUND="REFUND",a.DECLINED="DECLINED",function(e){e.GROCERIES="GROCERIES",e.RESTAURANTS="RESTAURANTS",e.ELECTRONICS="ELETRONICS"}(s||(s={}));class u{constructor(e){this.panels=[],this.id=e.id,this.transactionDate=new Date(e.transactionDate),this.card=new i.default(e.card),this.transactionStatus=e.transactionStatus,this.merchantName=e.merchantName,this.amount=e.amount,this.category=e.category,this.mcc=e.mcc,e.panels&&(this.panels=e.panels.map((e=>new o.RecipePanel(e))))}}t.Transaction=u,t.default=u},5625:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TransferSource=void 0,t.TransferSource=class{constructor(e){this.id=e.id,this.name=e.name,this.type=e.type}}},2981:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;class n{constructor(e){this.firstName=e.firstName,this.middleName=e.middleName,this.lastName=e.lastName,this.email=e.email,this.phone=e.phone,this.hasSSN=e.hasSSN}}t.User=n,t.default=n},6086:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AccountService=void 0;const o=i(n(2141)),s=i(n(4423)),a=n(4612),u=i(n(1681));t.AccountService=new class{constructor(){this.subject=new a.BehaviorSubject(null)}changeAddress(e,t,n,i,a){return r(this,void 0,void 0,(function*(){let r=yield s.default.mutation(o.default`
            mutation($street: String, $complement: String, $city: String, $state: String, $zipCode: String) {
                account {
                    changeAddress(street: $street, complement: $complement, city: $city, state: $state, zipCode:$zipCode) {
                        street
                        complement
                        city
                        state
                        zipCode   
                    }                                                
                }
            }
        `,{street:e,complement:t,city:n,state:i,zipCode:a});r.account.address=r.account.changeAddress;const c=new u.default(r.account);this.subject.next(c)}))}getAccount(){var e;return r(this,void 0,void 0,(function*(){if(null===(e=this.subject.value)||void 0===e?void 0:e.address)return this.subject.value;let t=yield s.default.query(o.default`
            query {                
                account {
                    balance 
                    address {
                        street,
                        complement,
                        city,
                        state,
                        zipCode
                    }                 
                }
            }
        `);const n=new u.default(t.account);return this.subject.asObservable().toPromise(),this.subject.next(n),n}))}addSubscriber(e){return null==this.subject.value&&this.getAccount(),this.subject.subscribe(e)}},t.default=t.AccountService},5509:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AuthService=void 0;const o=n(2200),s=i(n(2141)),a=n(4612),u=i(n(4423));t.AuthService=new class{constructor(){this.subject=new a.BehaviorSubject(""),this.authToken=""}signUp(e,t,n,i,o){return r(this,void 0,void 0,(function*(){let r=yield u.default.mutation(s.default`mutation($email: String, $firstName: String, $middleName: String, $lastName: String, $password: String) {
            createUser(email: $email, firstName: $firstName, lastName: $lastName, middleName: $middleName, password: $password) {
              email,
              firstName,
              lastName,
              middleName
            }
          }`,{firstName:e,middleName:t,lastName:n,email:i,password:o});return yield this.signIn(i,o),r.createUser}))}signIn(e,t){return r(this,void 0,void 0,(function*(){let n=yield o.Auth.signIn({username:e,password:t});this.subject.next(n.signInUserSession.idToken.jwtToken)}))}forgotPassword(e){return r(this,void 0,void 0,(function*(){yield o.Auth.forgotPassword(e)}))}forgotPasswordSubmit(e,t,n){return r(this,void 0,void 0,(function*(){yield o.Auth.forgotPasswordSubmit(e,t,n)}))}setAuthToken(e){this.authToken=e,this.subject.next(this.authToken)}verifyEmail(e,t){return r(this,void 0,void 0,(function*(){yield o.Auth.confirmSignUp(e,t)}))}changePhone(e){return r(this,void 0,void 0,(function*(){let t=yield o.Auth.currentAuthenticatedUser();yield o.Auth.updateUserAttributes(t,{phone_number:e})}))}isAuthenticated(){return r(this,void 0,void 0,(function*(){try{return null!=(yield o.Auth.currentAuthenticatedUser())}catch(e){return!1}}))}getAuthToken(){return r(this,void 0,void 0,(function*(){try{let e=yield o.Auth.currentSession();return this.authToken=e.getIdToken().getJwtToken(),this.subject.next(this.authToken),this.authToken}catch(e){return""}}))}addSubscriber(e){return this.subject.subscribe(e)}logout(){return r(this,void 0,void 0,(function*(){yield o.Auth.signOut(),this.subject.next("")}))}},t.default=t.AuthService},774:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CardsService=void 0;const o=i(n(4423)),s=i(n(2141)),a=i(n(4338)),u=n(4612),c="\nid,\nname, \nstatus,\nlastFour,\nexpirationDate,\nmedia",l="\namount\nperiod\nresets\nactive\n";t.CardsService=new class{constructor(){this.subject=new u.BehaviorSubject(null),this.cards=[]}addCard(e,t){return r(this,void 0,void 0,(function*(){let n=yield o.default.mutation(s.default`mutation($name: String, $media: CardMedia) {
            createCard(name: $name, media: $media) {
                ${c}
            }}`,{name:e,media:t});const r=new a.default(n.createCard);return this.cards.push(r),this.subject.next(this.cards),r}))}linkCard(e,t){return r(this,void 0,void 0,(function*(){const n=yield o.default.mutation(s.default`mutation($key: String, $name: String) {
            linkCard(key: $key, name: $name) {
                ${c}
            }
        }`,{key:e,name:t}),r=new a.default(n.linkCard);return this.cards.push(r),this.subject.next(this.cards),r}))}getCards(){return r(this,void 0,void 0,(function*(){let e=yield o.default.query(s.default`
            query {
                cards {
                    ${c}
                    cardControls {
                        spendingLimit {
                            ${l}
                        }
                    }
                }
            }`);return this.cards=e.cards.map((e=>new a.default(e))),this.subject.next(this.cards),e.cards}))}cardCancel(e){return r(this,void 0,void 0,(function*(){let t=yield o.default.mutation(s.default`
            mutation($cardId: String) {
                card(id: $cardId) {
                    cancelCard {
                        ${c}
                    }
                }
            }
        `,{cardId:e.id});return this.cards=this.cards.map((n=>n.id==e.id?new a.default(t.card):n)),this.subject.next(this.cards),t.card}))}reIssueCard(e){return r(this,void 0,void 0,(function*(){let t=yield o.default.mutation(s.default`
            mutation($cardId: String) {
                card(id: $cardId) {
                    reIssueCard {
                        ${c}
                    }
                }
            }
        `,{cardId:e.id});return this.cards=this.cards.map((n=>n.id==e.id?new a.default(t.card):n)),this.subject.next(this.cards),t.card}))}saveControls(e){var t;return r(this,void 0,void 0,(function*(){const n=null===(t=e.cardControls)||void 0===t?void 0:t.spendingLimit;let r=yield o.default.mutation(s.default`
            mutation($cardId: String, $amount: Float, $period: String, $resets: Boolean, $active: Boolean) {
                card(id: $cardId) {
                    ${c},
                    cardControls {
                        spendingLimit: saveSpendingLimit(amount: $amount, period: $period, resets: $resets, active: $active) {
                            ${l}
                        }
                    }
                }
            }
        `,{cardId:e.id,amount:null==n?void 0:n.amount,period:null==n?void 0:n.period,resets:!0,active:null==n?void 0:n.active});return this.cards=this.cards.map((t=>t.id==e.id?new a.default(r.card):t)),this.subject.next(this.cards),r.card}))}addSubscriber(e){return null==this.subject.value&&this.getCards(),this.subject.subscribe((t=>{null!=t&&e(t)}))}},t.default=t.CardsService},4423:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.GraphQLService=t.GraphQLException=t.GraphQLVariables=void 0;const i=n(8848),o=n(8543),s=n(7058),a=n(4612);t.GraphQLVariables=class{};class u{constructor(e){this.errors=[],Object.assign(this.errors,e);var t=this.errors.map((e=>e.message)).join("\n");this.message=t,this.name=""}}t.GraphQLException=u,t.GraphQLService=new class{constructor(){this._authToken="",this.exceptionSubject=new a.Subject,this.subscribers=new a.Subject}configure(e){const t=new o.HttpLink({uri:e.serverUrl,fetch:e.fetch}),n=new s.InMemoryCache;this.client=new i.ApolloClient({link:t,cache:n})}setAuthToken(e){this._authToken=e}mutation(e,t){return r(this,void 0,void 0,(function*(){try{this.subscribers.next("sending");let n=yield this.client.mutate({mutation:e,variables:t,errorPolicy:"all",context:{headers:{authorization:`Bearer ${this._authToken}`}}});if(this.subscribers.next("receiving"),n.errors){const e=new u(n.errors);throw this.exceptionSubject.next(e),this.subscribers.next("finished"),e}return this.subscribers.next("finished"),n.data}catch(e){throw console.error(e),e}}))}query(e,t,n="no-cache"){return r(this,void 0,void 0,(function*(){this.subscribers.next("sending");let r=yield this.client.query({query:e,errorPolicy:"all",variables:t,fetchPolicy:n,context:{headers:{authorization:`Bearer ${this._authToken}`}}});if(this.subscribers.next("receiving"),r.errors){console.error(r.errors);const e=new u(r.errors);throw this.exceptionSubject.next(e),this.subscribers.next("finished"),e}return this.subscribers.next("finished"),r.data}))}addExceptionSubscriber(e){return this.exceptionSubject.subscribe(e)}addSubscriber(e){return this.subscribers.subscribe(e)}},t.default=t.GraphQLService},1598:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.RecipesService=void 0;const o=n(2989),s=i(n(4423)),a=i(n(2141)),u=n(4600),c=n(4612),l="\nid,\nname,\ndescription,\niconUrl,\nscreenShotsUrl,\nmadeBy,\ninstallCount,\nratingCount\n",f="\nfileName,\neTag,\nurl,    \n",d="\nid\nconfiguration\nrecipe {\n    id\n}\n";t.RecipesService=new class{constructor(){this.installedRecipes=[],this.installedRecipesSubject=new c.BehaviorSubject(null),this.allRecipesSubject=new c.BehaviorSubject(null)}notifyIntalledRecipeSusbcribers(e){if(e instanceof u.RecipeInstall){const t=this.installedRecipes.findIndex((t=>t.id==e.id));-1==t?this.installedRecipes.push(e):this.installedRecipes[t]=e}else this.installedRecipes=e;this.installedRecipesSubject.next(this.installedRecipes)}getAll(){return r(this,void 0,void 0,(function*(){const e=(yield s.default.query(a.default`
            query {
                recipes {
                    ${l}
                }
            }
        `)).recipes.map((e=>new o.Recipe(e)));return this.allRecipesSubject.next(e),e}))}getRecipe(e){return r(this,void 0,void 0,(function*(){const t=yield s.default.query(a.default`
        query($recipeId: String) {
            recipe(id: $recipeId) {
                ${l}
                files {
                    fileName
                    eTag,
                    url                    
                }
            }
        }`,{recipeId:e}),n=new o.Recipe(t.recipe),r=this.allRecipesSubject.value,i=null==r?void 0:r.findIndex((e=>e.id===n.id));return i&&i>=0?r[i]=n:null==r||r.push(n),this.allRecipesSubject.next(r),n}))}loadTemplates(e){return r(this,void 0,void 0,(function*(){const t=[],n=(yield s.default.query(a.default`
            query($id: String) {
                recipe(id: $id) {
                    files {
                        fileName,
                        eTag,
                        url                        
                    }
                }
            }
        `,{id:e.id})).recipe.files.map((e=>new o.RecipeFile(e)));for(const e of n){const n=fetch(e.url);t.push(n)}const r=yield Promise.all(t),i=[];for(const e of r)i.push(e.json());return(yield Promise.all(i)).map((e=>new o.RecipeTemplate(e)))}))}installRecipe(e,t){return r(this,void 0,void 0,(function*(){const n=yield s.default.mutation(a.default`
            mutation($recipeId: String, $configuration: JsonString) {
                recipe(id: $recipeId) {
                    install(configuration: $configuration) {
                       ${d}
                    }
                    ${l}
                }
            }
        `,{recipeId:e.id,configuration:JSON.stringify(t)}),r=new u.RecipeInstall(n.recipe.install);return this.notifyIntalledRecipeSusbcribers(r),r}))}findInstalledRecipes(){return r(this,void 0,void 0,(function*(){const e=(yield s.default.query(a.default`
            query {
                installedRecipes {
                    ${d}         
                }
            }
        `)).installedRecipes.map((e=>new u.RecipeInstall(e)));this.notifyIntalledRecipeSusbcribers(e)}))}findRecipeInstall(e){return r(this,void 0,void 0,(function*(){const e=(yield s.default.query(a.default`
        query {
            installedRecipes {
                ${d}         
            }
        }
        `)).installedRecipes.map((e=>new u.RecipeInstall(e)));this.notifyIntalledRecipeSusbcribers(e)}))}findMyRecipes(){return r(this,void 0,void 0,(function*(){return(yield s.default.query(a.default`
        query {
            myRecipes{
                ${l}
            }
        }
        `)).myRecipes.map((e=>new o.Recipe(e)))}))}changePanelData(e,t){return r(this,void 0,void 0,(function*(){yield s.default.mutation(a.default`
            mutation($recipeInstallId: String, $panelId: String, $data: JsonString) {
                recipeInstall(id: $recipeId) {
                    panel(id: $panelId) {
                        changeData(data: $data)
                    }
                }
            }
        `,{recipeInstallId:e.recipeInstall.id,panelId:e.id,data:JSON.stringify(t)})}))}createRecipe(e,t){return r(this,void 0,void 0,(function*(){const n=yield s.default.mutation(a.default`
            mutation($name: String, $description: String, $fileNames: [String])  {
                createRecipe(name: $name, description: $description) {
                    ${l}
                    files: saveFiles(fileNames: $fileNames)  {
                        ${f}                        
                    }
                }
            }
        `,{name:e.name,description:e.description,fileNames:t});return new o.Recipe(n.createRecipe)}))}editRecipe(e,t,n){return r(this,void 0,void 0,(function*(){const r=yield s.default.mutation(a.default`
            mutation($id: String, $name: String, $description: String, $files: [String], $deleted: [String])  {
                recipe(id: $id) {
                    edit(name: $name, description: $description) {
                        ${l}
                        files: saveFiles(fileNames: $files) {
                            ${f}
                        }
                        deleted: deleteFiles(fileNames: $deleted)
                    }   
                }
            }
        `,{id:e.id,name:e.name,description:e.description,files:t,deleted:n});return new o.Recipe(r.recipe.edit)}))}getRecipeInstallToken(e){return r(this,void 0,void 0,(function*(){return(yield s.default.mutation(a.default`
            mutation($recipeInstallId: String) {
                recipeInstall(id: $recipeInstallId) {
                    createToken
                }
            }
        `,{recipeInstallId:e})).recipeInstall.createToken}))}changeRecipeInstallConfig(e,t){return r(this,void 0,void 0,(function*(){const n=yield s.default.mutation(a.default`
            mutation($recipeInstallId: String, $config: JsonString) {
                recipeInstall(id: $recipeInstallId) {
                    ${d},
                    changeConfiguration(value: $config)
                }
            }
        `,{recipeInstallId:e,config:JSON.stringify(t)});n.recipeInstall.configuration=n.recipeInstall.changeConfiguration;const r=new u.RecipeInstall(n.recipeInstall);return this.notifyIntalledRecipeSusbcribers(r),r}))}addRecipeInstallSubscriber(e){return null==this.installedRecipesSubject.value&&this.findInstalledRecipes(),this.installedRecipesSubject.subscribe((t=>{null!=t&&e(t)}))}addRecipesSubscriber(e){return null==this.allRecipesSubject.value&&this.getAll(),this.allRecipesSubject.subscribe((t=>{null!=t&&e(t)}))}},t.default=t.RecipesService},3482:function(e,t){"use strict";var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.StorageService=void 0,t.StorageService=new class{saveFile(e,t){return n(this,void 0,void 0,(function*(){yield fetch(e,{method:"PUT",body:t})}))}loadFile(e){return n(this,void 0,void 0,(function*(){const t=yield fetch(e);return yield t.text()}))}},t.default=t.StorageService},8643:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TransactionService=void 0;const o=i(n(4423)),s=i(n(2141)),a=i(n(1123)),u=n(4612);t.TransactionService=new class{constructor(){this.subject=new u.BehaviorSubject(null)}getAllTransactions(e=!1){return r(this,void 0,void 0,(function*(){const t=(yield o.default.query(s.default`
            query {
                transactions {
                   id,
                   transactionDate,
                   card {
                       id
                   },
                   transactionStatus,
                   merchantName,
                   amount,
                   category,
                   mcc
                }
            }
         `,void 0,e?"network-only":"cache-first")).transactions.map((e=>new a.default(e)));return this.subject.next(t),t}))}getTransactionDetails(e){return r(this,void 0,void 0,(function*(){const t=yield o.default.query(s.default`
            query($id: String) {
                transaction(id: $id) {
                   id,
                   transactionDate,
                   card {
                       id
                   },
                   transactionStatus,
                   merchantName,
                   amount,
                   category,
                   mcc,
                   panels {
                       id
                       recipeInstall {
                           id  
                           recipe {
                               name
                           }                           
                       }
                       templateFile {
                           fileName
                           eTag
                           url
                       }
                       data
                   }
                }
            }
         `,{id:e.id});return new a.default(t.transaction)}))}addSubscriber(e){return this.subject.value||this.getAllTransactions(),this.subject.subscribe(e)}},t.default=t.TransactionService},4032:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TransferService=void 0;const o=i(n(2141)),s=n(4612),a=n(5625),u=i(n(4423));t.TransferService=new class{constructor(){this.transferSourceSubject=new s.BehaviorSubject(null),this.transferSources=[]}getTransferSources(){return r(this,void 0,void 0,(function*(){const e=yield u.default.query(o.default`
            query {
                transferSources {
                    id
                    name
                    type
                }
            }
        `);return this.transferSources=e.transferSources.map((e=>new a.TransferSource(e))),this.transferSourceSubject.next(this.transferSources),this.transferSources}))}getTransferSourceConfig(e){return r(this,void 0,void 0,(function*(){const t=yield u.default.query(o.default`
            query($type: String) {
                transferSourceConfig(type: $type) 
            }
        `,{type:e});return JSON.parse(t.transferSourceConfig)}))}addTransferSource(e,t,n){return r(this,void 0,void 0,(function*(){const r=yield u.default.mutation(o.default`
            mutation($name: String, $type: String, $data: String) {
                createTransferSource(name: $name, type: $type, typeParams: $data) {
                    id
                    name
                    type
                }
            }`,{name:e,type:t,data:JSON.stringify(n)}),i=new a.TransferSource(r.createTransferSource);return this.transferSources.push(i),this.transferSourceSubject.next(this.transferSources),i}))}addTransferSourcesSubscriber(e){return null==this.transferSourceSubject.value&&this.getTransferSources(),this.transferSourceSubject.subscribe((t=>{null!=t&&e(t)}))}},t.default=t.TransferService},4307:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.UserService=void 0;const o=i(n(2141)),s=i(n(4423)),a=n(4612),u=i(n(2981));t.UserService=new class{constructor(){this.user=new u.default({}),this.subject=new a.BehaviorSubject(null)}getUser(){return r(this,void 0,void 0,(function*(){let e=yield s.default.query(o.default`
            query {
                user {
                    firstName,
                    middleName,
                    lastName,
                    email,
                    phone,
                    hasSSN
                }
            }
        `);return Object.assign(this.user,e.user),this.subject.next(this.user),this.user}))}changePhone(e){return r(this,void 0,void 0,(function*(){let t=yield s.default.mutation(o.default`
            mutation($phone: String) {
                user {
                    changePhone(number: $phone) 
                }
            }
        `,{phone:e});return this.user.phone=t.user.changePhone,this.subject.next(this.user),this.user}))}changeSSN(e){return r(this,void 0,void 0,(function*(){let t=yield s.default.mutation(o.default`
            mutation($ssn: String) {
                user {
                    changeSSN(ssn: $ssn)
                }
            }
        `,{ssn:e});return this.user.hasSSN=t.user.changeSSN,this.subject.next(this.user),this.user}))}addPushNotificationToken(e){return r(this,void 0,void 0,(function*(){yield s.default.mutation(o.default`
            mutation($token: String) {
                user {
                    addPushNotificationToken(token: $token)
                }