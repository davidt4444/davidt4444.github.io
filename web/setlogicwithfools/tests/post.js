//    document.evaluate("//div/div",//xpath
//                                   document,//contexxtNode
//                                   null,//namespaceResolver
//                                   XPathResult.ORDERED_NODE_ITERATOR_TYPE,//resultType
//                                   /*
//                                    ANY_TYPE    0    Whatever type naturally results from the given expression.
//                                    NUMBER_TYPE    1    A result set containing a single number. Useful, for example, in an XPath expression using the count() function.
//                                    STRING_TYPE    2    A result set containing a single string.
//                                    BOOLEAN_TYPE    3    A result set containing a single boolean value. Useful, for example, an XPath expression using the not() function.
//                                    UNORDERED_NODE_ITERATOR_TYPE    4    A result set containing all the nodes matching the expression. The nodes in the result set are not necessarily in the same order they appear in the document.
//                                    ORDERED_NODE_ITERATOR_TYPE    5    A result set containing all the nodes matching the expression. The nodes in the result set are in the same order they appear in the document.
//                                    UNORDERED_NODE_SNAPSHOT_TYPE    6    A result set containing snapshots of all the nodes matching the expression. The nodes in the result set are not necessarily in the same order they appear in the document.
//                                    ORDERED_NODE_SNAPSHOT_TYPE    7    A result set containing snapshots of all the nodes matching the expression. The nodes in the result set are in the same order they appear in the document.
//                                    ANY_UNORDERED_NODE_TYPE    8    A result set containing any single node that matches the expression. The node is not necessarily the first node in the document that matches the expression.
//                                    FIRST_ORDERED_NODE_TYPE    9    A result set containing the first node in the document that matches the expression.
//                                    */
//                                   null//result
//                                   ) ;
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

var posts=posts||[];
var post={};
//post.titleAddres='';
//post.title='';
//post.authorAddress='';
//post.author='';
//post.dateAddress='';
//post.date='';
//post.drawingAddress='';

post.titleAddress=getElementByXpath("//div/div/h2/a/@href").nodeValue;
post.title=getElementByXpath("//div/div/h2/a").innerHTML;
//console.log( getElementByXpath("//div/div/div/ul/li[0]/a/@href") );
post.authorAddress=getElementByXpath("//div/div/div/ul").children[0].children[0].href.replace(getElementByXpath("//div/div/div/ul").children[0].children[0].baseURI, '');
//console.log( getElementByXpath("//div/div/div/ul/li[0]/a") );
post.author=getElementByXpath("//div/div/div/ul").children[0].children[0].innerHTML;
//console.log( getElementByXpath("//div/div/div/ul/li[1]/a/@href") );
post.dateAddress=getElementByXpath("//div/div/div/ul").children[1].children[0].href.replace(getElementByXpath("//div/div/div/ul").children[1].children[0].baseURI, '');
//console.log( getElementByXpath("//div/div/div/ul/li[1]/a") );
post.date=getElementByXpath("//div/div/div/ul").children[1].children[0].innerHTML;
//console.log( getElementByXpath("//div/div[1]/iframe/@src") );
post.drawingAddress=getElementByXpath("//div//iframe/@src").nodeValue;

posts.push(post);

//console.log(post);
//console.log(posts);
