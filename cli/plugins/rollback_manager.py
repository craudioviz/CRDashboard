import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--avatar", required=True)
parser.add_argument("--checkpoint", required=True)
args = parser.parse_args()

print(f"[ROLLBACK] Checkpoint created for avatar '{args.avatar}' at '{args.checkpoint}'")
