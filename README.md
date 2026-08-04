# mcp-emojihub

EmojiHub MCP — wraps EmojiHub API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_emoji` | Get a random emoji with its character, name, category, and group. Use when you need an unpredictable emoji for variety or surprise elements. |
| `get_by_category` | Search emojis by category (e.g., "smileys-and-people", "food-and-drink", "travel-and-places", "symbols"). Returns matching emojis with names and groups. |
| `get_by_group` | Search emojis by group (e.g., "face-positive", "face-negative", "animals-mammal", "hand-fingers-open"). Returns matching emojis with names and categories. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "emojihub": {
      "url": "https://gateway.pipeworx.io/emojihub/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Emojihub data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
