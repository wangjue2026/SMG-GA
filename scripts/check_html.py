from html.parser import HTMLParser
import sys

class TagCounter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.errors = []
        self.line_offset = 0

    def handle_starttag(self, tag, attrs):
        if tag not in ["meta", "link", "img", "input", "br", "hr", "source", "path", "stop", "defs", "br", "col", "embed", "track", "wbr"]:
            self.tags.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if tag not in ["meta", "link", "img", "input", "br", "hr", "source", "path", "stop", "defs", "br", "col", "embed", "track", "wbr"]:
            if self.tags and self.tags[-1][0] == tag:
                self.tags.pop()
            else:
                self.errors.append(f"Mismatched end tag: </{tag}> at line {self.getpos()[0]}. Expected: </{self.tags[-1][0] if self.tags else None}> started at line {self.tags[-1][1][0] if self.tags else None}")

    def close(self):
        super().close()
        print("Errors:", self.errors)
        if self.tags:
            print("Remaining tags:")
            for tag, pos in self.tags:
                print(f"  <{tag}> at line {pos[0]}")

parser = TagCounter()
with open(sys.argv[1], "r") as f:
    parser.feed(f.read())
parser.close()