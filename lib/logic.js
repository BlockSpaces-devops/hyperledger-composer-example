




/**
 * Allows a SupplyChainMember to send honey out for delivery
 * @param {honey.supply.chain.SendForDelivery} deliverySent
 * @transaction 
 */
function onSendForDelivery(deliverySent) {

    var honeyRegistry;
    var factory = getFactory();

    return Promise.all([
        getAssetRegistry('honey.supply.chain.Honey')
    ]).then(function(registries){
        honeyRegistry = registries[0];

        deliverySent.honey.currentOwner = deliverySent.honey.receiver;
        
        return honeyRegistry.update(deliverySent.honey);
    }).then(function(){
        // Success

        var deliverySentEvent = factory.newEvent('honey.supply.chain', 'DeliverySent');
        deliverySentEvent.senderID = deliverySent.sender.memberID;
        deliverySentEvent.receiverID = deliverySent.receiver.memberID;
        deliverySentEvent.honeyBatchID = deliverySent.honeyBatch.batchID;
      
        emit(deliverySentEvent);

        return Promise.resolve(true);
    }).catch(function(err){
        console.log(X+' - FOUND AN ERROR');
        console.log(X+err.toString());
        throw err;
    });


}
