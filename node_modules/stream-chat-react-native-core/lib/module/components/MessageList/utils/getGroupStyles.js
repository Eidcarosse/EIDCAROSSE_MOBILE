Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupStyles = void 0;
var getGroupStyles = function getGroupStyles(params) {
  var dateSeparators = params.dateSeparators,
    hideDateSeparators = params.hideDateSeparators,
    maxTimeBetweenGroupedMessages = params.maxTimeBetweenGroupedMessages,
    messages = params.messages,
    noGroupByUser = params.noGroupByUser,
    userId = params.userId;
  if (noGroupByUser) return {};
  var messageGroupStyles = {};
  var messagesFilteredForNonUser = messages.filter(function (message) {
    var _message$user;
    var isMessageTypeDeleted = message.type === 'deleted';
    return !isMessageTypeDeleted || userId === ((_message$user = message.user) == null ? void 0 : _message$user.id);
  });
  for (var i = 0; i < messagesFilteredForNonUser.length; i++) {
    var _message$user2, _previousMessage$user, _messageGroupStyles$p, _nextMessage$user;
    var previousMessage = messagesFilteredForNonUser[i - 1];
    var message = messagesFilteredForNonUser[i];
    var nextMessage = messagesFilteredForNonUser[i + 1];
    var groupStyles = [];
    var isPrevMessageTypeDeleted = (previousMessage == null ? void 0 : previousMessage.type) === 'deleted';
    var isNextMessageTypeDeleted = (nextMessage == null ? void 0 : nextMessage.type) === 'deleted';
    var _userId = (message == null ? void 0 : (_message$user2 = message.user) == null ? void 0 : _message$user2.id) || null;
    var isTopMessage = !previousMessage || previousMessage.type === 'system' || _userId !== (previousMessage == null ? void 0 : (_previousMessage$user = previousMessage.user) == null ? void 0 : _previousMessage$user.id) || previousMessage.type === 'error' || !!isPrevMessageTypeDeleted || !hideDateSeparators && dateSeparators[message.id] || ((_messageGroupStyles$p = messageGroupStyles[previousMessage.id]) == null ? void 0 : _messageGroupStyles$p.includes('bottom'));
    var isBottomMessage = !nextMessage || nextMessage.type === 'system' || _userId !== (nextMessage == null ? void 0 : (_nextMessage$user = nextMessage.user) == null ? void 0 : _nextMessage$user.id) || nextMessage.type === 'error' || !!isNextMessageTypeDeleted || !hideDateSeparators && dateSeparators[nextMessage.id] || maxTimeBetweenGroupedMessages !== undefined && nextMessage.created_at.getTime() - message.created_at.getTime() > maxTimeBetweenGroupedMessages;
    if (isTopMessage) {
      groupStyles.push('top');
    }
    var isMessageTypeDeleted = message.type === 'deleted';
    if (isBottomMessage) {
      if (isTopMessage || isMessageTypeDeleted || message.type === 'error') {
        groupStyles.splice(0, groupStyles.length);
        groupStyles.push('single');
      } else {
        groupStyles.push('bottom');
      }
    }
    if (!isTopMessage && !isBottomMessage) {
      if (isMessageTypeDeleted || message.type === 'error') {
        groupStyles.splice(0, groupStyles.length);
        groupStyles.push('single');
      } else {
        groupStyles.splice(0, groupStyles.length);
        groupStyles.push('middle');
      }
    }
    if (message.id) {
      messageGroupStyles[message.id] = groupStyles;
    }
  }
  return messageGroupStyles;
};
exports.getGroupStyles = getGroupStyles;
//# sourceMappingURL=getGroupStyles.js.map