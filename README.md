# mcp-emojihub

MCP server for emoji lookup by category and group via [EmojiHub API](https://github.com/cheatsnake/emojihub). No authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `random_emoji` | Get a random emoji |
| `get_by_category` | Get all emojis in a given category |
| `get_by_group` | Get all emojis in a given group |

## Quickstart via Pipeworx Gateway

Call any tool through the hosted gateway with zero setup:

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "emojihub_random_emoji",
      "arguments": {}
    }
  }'
```

## License

MIT
